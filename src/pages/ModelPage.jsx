import React from 'react';
import { BrainCircuit } from 'lucide-react';

function ModelPage({ model }) {
    return (
        <section className="modelGrid">
            <div className="panel modelIntro">
                <div className="badge">
                    <BrainCircuit />
                    MODEL TRANSPARENCY
                </div>

                <h2>
                    Built to be explainable,
                    comparable, and upgradeable.
                </h2>

                <p>
                    The current hackathon build compares
                    multiple algorithms, selects the
                    strongest AUC performer, and exposes
                    transparent evaluation metrics.
                </p>

                <div className="modelFacts">
                    <div>
                        <b>{model?.records || 6000}</b>
                        <span>training records</span>
                    </div>

                    <div>
                        <b>{model?.metrics?.length || 3}</b>
                        <span>models evaluated</span>
                    </div>

                    <div>
                        <b>
                            {model?.selected_model || 'Auto'}
                        </b>
                        <span>selected model</span>
                    </div>
                </div>
            </div>

            <div className="panel metrics">
                <h3>Model comparison</h3>

                {model?.metrics?.map((metric) => (
                    <div
                        className="metric"
                        key={metric.name}
                    >
                        <div>
                            <b>{metric.name}</b>

                            <span>
                                AUC{' '}
                                {Math.round(
                                    metric.auc * 100
                                )}
                                %
                            </span>
                        </div>

                        <div className="bar">
                            <i
                                style={{
                                    width: `${metric.auc * 100}%`
                                }}
                            />
                        </div>

                        <small>
                            Accuracy {metric.accuracy} ·
                            Recall {metric.recall} · F1{' '}
                            {metric.f1}
                        </small>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ModelPage;